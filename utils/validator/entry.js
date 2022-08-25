class Entry {
  value;
  label = 'Unknown';
  rules = [];

  errors = [];

  /**
   *
   * @param {any} value
   * @param {string} label
   * @param {string} rules
   */
  constructor(value, label, rules) {
    this.value = value;
    this.label = label;
    this.rules = rules.split('|');
  }

  validate() {
    const rules = this.rules;

    if (!rules.length) {
      return true;
    }

    // return boolean and assign errors on this.errors;
    return false;
  }
}

/**
 validate(value, 'From Name', 'string|required')
*/
