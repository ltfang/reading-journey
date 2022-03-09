// include all of your models here using CommonJS requires
const User = require("./User.js")
const Book = require("./Book.js")
const Profile = require("./Profile.js")
const ReadingSession = require("./ReadingSession.js")
const TicketTransaction = require("./TicketTransaction.js")
const Badge = require("./Badge.js")

module.exports = { User, Book, Profile, ReadingSession, TicketTransaction, Badge }; 