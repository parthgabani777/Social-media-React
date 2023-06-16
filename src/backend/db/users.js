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
    picture: "https://i.imgur.com/Rkq45FR.jpg",
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
    picture: "https://i.imgur.com/LOIVrvw.jpg",
  },
  {
    _id: 9,
    firstName: "Akshay",
    lastName: "Saini",
    username: "akshaysaini",
    password: "akshay123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    picture: "https://i.imgur.com/IouAC5u.jpg",
  },

  {
    _id: 3,
    firstName: "Gopal",
    lastName: "Bharadva",
    username: "gopalbharadva",
    password: "29DpO4SOp",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    picture: "https://i.imgur.com/jc9aeDT.jpg",
  },
  {
    _id: 4,
    firstName: "Akshay",
    lastName: "Patel",
    username: "akshaypatel",
    password: "bHqBfU",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    picture: "https://i.imgur.com/Bsg7XeU.jpg",
  },
  {
    _id: 5,
    firstName: "Tejash",
    lastName: "Hirapara",
    username: "tejashhirapara",
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
