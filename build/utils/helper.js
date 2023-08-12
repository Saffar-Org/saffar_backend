"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/// Helper functions present here.
class Helper {
    /// Gets a random int less than [max]
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    /// Generates a 10 digit phone number
    static generatePhone() {
        let phone = "";
        for (let index = 0; index < 10; index++) {
            phone += this.getRandomInt(10);
        }
        return phone;
    }
}
/// This takes the object from the populate function and then 
/// deletes the '__v' field and 
/// changes the '_id' field to 'id' and returns a new 
/// object with the 'id' field.
Helper.getObjectWithIdInsteadOf_idAnd__v = (doc) => {
    const _a = doc.toObject(), { _id, __v } = _a, rest = __rest(_a, ["_id", "__v"]);
    rest.id = _id.toString();
    return rest;
};
module.exports = Helper;
