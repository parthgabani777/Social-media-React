import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
    {
        _id: 1,
        firstName: "Adarsh",
        lastName: "Balika",
        username: "adarshbalika",
        password: "adarshbalika123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 2,
        firstName: "Parth",
        lastName: "Gabani",
        username: "parthgabani",
        password: "parth123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 3,
        firstName: "Anastasie",
        lastName: "Jowers",
        username: "ajowers0",
        password: "29DpO4SOp",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 4,
        firstName: "Konstantine",
        lastName: "Perrycost",
        username: "kperrycost1",
        password: "bHqBfU",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 5,
        firstName: "Reuben",
        lastName: "Bickerstasse",
        username: "rbickerstasse2",
        password: "wjQn0XVLPxV",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 6,
        firstName: "Elaina",
        lastName: "Scotchmur",
        username: "escotchmur3",
        password: "yWoCCq",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: 7,
        firstName: "Irita",
        lastName: "Luchelli",
        username: "iluchelli4",
        password: "cpQEcElv",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
];
