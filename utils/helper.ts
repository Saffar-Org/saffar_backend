/// Helper functions present here.
class Helper {
    /// This takes the object from the populate function and then 
    /// deletes the '__v' field and 
    /// changes the '_id' field to 'id' and returns a new 
    /// object with the 'id' field.
    static getObjectWithIdInsteadOf_idAnd__v = (doc: any): Object => {
        const {_id, __v, ...rest  } = doc.toObject();
        rest.id = _id.toString();
        return rest;
    }

    /// Gets a random int less than [max]
    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    /// Generates a 10 digit phone number
    static generatePhone(): string {
        let phone: string = "";

        for (let index = 0; index < 10; index++) {
            phone += this.getRandomInt(10);
        }

        return phone;
    }
}

export = Helper;
