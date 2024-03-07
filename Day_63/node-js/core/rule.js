const { object } = require("yup");

class Rule {
   async validate(input, rules) {
      const schema = object().shape(rules);

      try {
         const validatedBody = await schema.validate(input, {
            abortEarly: false,
         });
         return { body: validatedBody };
      } catch (e) {
         const errors = Object.fromEntries(
            e.inner.map(({ path, message }) => [path, message])
         );
         return { error: [400, "Bad request", errors] };
      }
   }
}

module.exports = Rule;
