const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../../../models/index");
const { successResponse, errorResponse } = require("../../../helpers/response");
const { string, object } = require("yup");
const UseTransformer = require("../../../transformers/clients/user.transformer");
const Cache = require("../../../utils/redis");

module.exports = {
   index: async (req, res) => {
      const { sort = "id", order = "desc", q, status, page, limit } = req.query;
      const filter = {};

      if (status === true || status === false) filter.status = status === true;

      if (q) {
         filter[Op.or] = {
            name: { [Op.iLike]: `%${q}%` },
            email: { [Op.iLike]: `%${q}%` },
         };
      }

      const options = {
         order: [[sort, order]],
         attributes: { exclude: "password" },
         where: filter,
      };

      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
         const offset = (page - 1) * limit;
         options.limit = limit;
         options.offset = offset;
      }

      try {
         const { count, rows: users } = await Cache.remember(
            "users-cache",
            60 * 60 * 24,
            () => User.findAndCountAll(options)
         );

         return successResponse(
            res,
            200,
            "Success",
            new UseTransformer(users),
            { count }
         );
      } catch (error) {
         return errorResponse(res, 500, "Server Error");
      }
   },
   find: async (req, res) => {
      const { id } = req.params;
      try {
         const user = await User.findByPk(id, {
            attributes: { exclude: "password" },
         });

         if (!user) return errorResponse(res, 400, "User not found");

         return successResponse(res, 200, "Success", user);
      } catch (error) {
         return errorResponse(res, 500, "Server Error");
      }
   },
   store: async (req, res) => {
      const schema = object({
         name: string().required("Tên không dược để trống"),
         email: string()
            .required("Email bắt buộc phải nhập")
            .test(
               "check-unique-email",
               "Email đã được sử dụng",
               async (value) => {
                  const user = await User.findOne({ where: { email: value } });
                  return !user;
               }
            ),
         password: string().required("Mật khẩu không dược để trống"),
      });

      try {
         const body = await schema.validate(req.body, { abortEarly: false });

         const user = await User.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
         });

         return successResponse(res, 201, "Success", user);
      } catch (e) {
         const errors = Object.fromEntries(
            e.inner.map(({ path, message }) => [path, message])
         );
         return errorResponse(res, 400, "Bad request", errors);
      }
   },
};
