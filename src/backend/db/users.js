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
];
