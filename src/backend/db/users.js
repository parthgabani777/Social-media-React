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
        _id: 8,
        firstName: "Tanay",
        lastName: "Pratap",
        username: "tanaypratap",
        password: "tanay123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        picture:
            "https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_400x400.jpg",
    },
    {
        _id: 9,
        firstName: "Akshay",
        lastName: "Saini",
        username: "akshaysaini",
        password: "akshay123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        picture:
            "https://pbs.twimg.com/profile_images/1219645637324488705/XD94Q6D1_400x400.jpg",
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
