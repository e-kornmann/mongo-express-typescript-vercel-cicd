"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.saveBookings = exports.updateSitterBookings = exports.getSitterById = exports.getAvailableSitters = void 0;
const Moment = __importStar(require("moment"));
const moment_range_1 = require("moment-range");
const client_1 = __importDefault(require("../db/client"));
const moment = (0, moment_range_1.extendMoment)(Moment);
const getAvailableSitters = (dOfB, sT, eT, dNOfB) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.connect();
    const db = client_1.default.db('saltdb');
    const col = db.collection('sitters');
    // Find all sitters with the specified availability on the day of the booking
    const sitters = yield col.find({
        availability: dNOfB,
    }).toArray();
    // Find all bookings that overlap with the specified time range
    const bookings = yield db.collection('bookings').find({
        dateOfBooking: dOfB,
        $or: [
            { startTime: { $lte: sT }, endTime: { $gt: sT } },
            { startTime: { $gte: sT, $lt: eT } },
            { startTime: { $lte: sT }, endTime: { $gte: eT } },
            // Booking starts before and ends after the time range
        ],
    }).toArray();
    // Filter out sitters who have bookings that overlap with the specified time range
    const availableSitters = sitters.filter(sitter => {
        const sitterBookings = bookings.filter(booking => booking.sitterId === sitter.id);
        return sitterBookings.every(booking => {
            const bookingStart = moment(`${booking.dateOfBooking} ${booking.startTime}`, 'DD/MM/YYYY HH:mm');
            const bookingEnd = moment(`${booking.dateOfBooking} ${booking.endTime}`, 'DD/MM/YYYY HH:mm');
            const bookingRange = moment.range(bookingStart, bookingEnd);
            const startParam = moment(sT, 'HH:mm');
            const endParam = moment(sT, 'HH:mm');
            const bookingOverlaps = bookingRange.overlaps(moment.range(startParam, endParam));
            return !bookingOverlaps;
        });
    });
    return availableSitters;
});
exports.getAvailableSitters = getAvailableSitters;
const getSitterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.connect();
    const db = client_1.default.db('saltdb');
    const col = db.collection('sitters');
    const sitter = yield col.findOne({ id });
    return sitter;
});
exports.getSitterById = getSitterById;
const updateSitterBookings = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.connect();
    const db = client_1.default.db('saltdb');
    const col = db.collection('sitters');
    const updateSitter = yield col.updateOne({ id }, { $push: { bookings: date } });
    console.log('updated', updateSitter);
    return updateSitter;
});
exports.updateSitterBookings = updateSitterBookings;
const saveBookings = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.connect();
    const db = client_1.default.db('saltdb');
    const col = db.collection('bookings');
    const addBooking = yield col.insertOne(booking);
    console.log('created booking', addBooking);
    return addBooking;
});
exports.saveBookings = saveBookings;
const getUserBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.connect();
    const db = client_1.default.db('saltdb');
    const col = db.collection('bookings');
    const allBookings = yield col.find(({ userId: id })).toArray();
    return allBookings;
});
exports.getUserBookings = getUserBookings;
//# sourceMappingURL=db.js.map