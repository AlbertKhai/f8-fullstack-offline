const userModel = require("../models/user");
const { getSchema } = require("../helper/helperUser");
const { getValueFlash } = require("../utils/controlFlash");

module.exports = {
    index: async (req, res, next) => {
        try {
            const errors = req.flash("errors");
            const valueFormPrev = req.flash("valueFormPrev");
            const errorFrom = req.flash("errorFrom")[0];

            let users = req.flash("users");
            const { status, keyword } = req.query;
            users =
                users?.length !== 0
                    ? users
                    : await userModel.all(status, keyword);
            return res.render("users/index", {
                users,
                keyword,
                status,
                valueFormPrev,
                errors,
                getValueFlash,
                errorFrom,
            });
        } catch (error) {
            return next(error);
        }
    },
    create: async (req, res, next) => {
        const { name, email, status } = req.body;
        req.flash("errorFrom", "create");

        const schema = getSchema();

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (e) {
            const errors = Object.fromEntries(
                e.inner.map((item) => {
                    return [item.path, item.message];
                })
            );
            req.flash("errors", errors);
            req.flash("valueFormPrev", req.body);
            return res.redirect(`/users`);
        }

        try {
            const users = await userModel.create(name, email, status);
            req.flash("users", users);
        } catch (error) {
            return next(error);
        }

        return res.redirect(`/users`);
    },
    edit: async (req, res, next) => {
        const { id, name, email, status } = req.body;
        req.flash("errorFrom", "edit");
        const schema = getSchema(id);

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (e) {
            const errors = Object.fromEntries(
                e.inner.map((item) => {
                    return [item.path, item.message];
                })
            );
            req.flash("errors", errors);
            req.flash("valueFormPrev", req.body);
            return res.redirect(`/users`);
        }

        try {
            const users = await userModel.edit(id, name, email, status);
            req.flash("users", users);
            return res.redirect(`/users`);
        } catch (error) {
            return next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.body;
            const users = await userModel.delete(id);
            req.flash("users", users);
            return res.redirect(`/users`);
        } catch (error) {
            return next(error);
        }
    },
};
