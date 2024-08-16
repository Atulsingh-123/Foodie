"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const App_1 = __importDefault(require("./App"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
(0, db_1.default)();
const server = http_1.default.createServer(App_1.default);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
