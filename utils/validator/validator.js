/**
 * @typedef Entry
 * @prop {string} label
 * @prop {any} value
 * @prop {string} rules
 *
 */

/**
 *
 * @param {Entry[]} validation
 * @returns {boolean | string[]}
 */
export function validate(validation) {
  const errors = validation.reduce((errors, entry) => {
    const rules = entry.rules.split('|');

    if (rules.length) {
      // rules.reduce((rule) => {});
    }

    return errors;
  }, []);

  return errors.length ? errors : true;
}

function valudateRule(rule, value) {
  //
}



// adding trim value modifier
// const MODIFY = {
//   trim: (value) => {
//     try {
//       return value.trim()
//     } catch (e) {
//       return ''
//     }
//   }
// }

/**
 USAGE

  validate([
    {
      label: 'Name',
      value: 1,
      rules: 'string|required|min:30',
    },
  ]);

 */
