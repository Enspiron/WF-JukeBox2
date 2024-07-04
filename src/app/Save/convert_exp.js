class convert_exp {
    exp_table = require('./rank_exp.json');
    
    constructor() {
        // Constructor code here
    }

    level_to_exp(level) {
        let exp = 0;
        for(let key in this.exp_table) {
            if (key <= level) {
                exp += this.exp_table[key];
            }
        }
        return exp;
    }

    exp_to_level(exp) {
        //loop through exp table
        //check if value is close to exp
        //return level
        let exp_ = 0;

        for (let key in this.exp_table) {
            exp_ += this.exp_table[key];
            if (exp_ > exp) {
                return key-1;
            }

            
        }

        if(exp == 16412378) {
            return 250;
        }

        return exp_;

    }
}

module.exports = convert_exp;