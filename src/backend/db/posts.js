import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
    {
        _id: uuid(),
        content: "How's goind on?",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "parthgabani",
        userId: 2,
        comments: [
            {
                _id: uuid(),
                username: "adarshbalika",
                text: "All going good",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
            {
                _id: uuid(),
                username: "parthgabani",
                text: "Nice!",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
        ],
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: uuid(),
        content: "In India, everyone is a self taught developer.",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "tanaypratap",
        userId: 8,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                username: "parthgabani",
                text: "true",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
        ],
    },
    {
        _id: uuid(),
        content:
            "80% of people get rejected for an interview. Out of the 20%, only 2-3% get the job.Here’s how you can avoid interview rejection and increase your chances of selection",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "tanaypratap",
        userId: 8,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [],
    },
    {
        _id: uuid(),
        content:
            "It’s not overnight success or luck, it’s 10 years of sleepless nights and hard work.",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "tanaypratap",
        userId: 8,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                username: "parthgabani",
                text: "That's true man, every brand you see nowadays had faced all the things.",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
        ],
    },
    {
        _id: uuid(),
        content:
            "Turning off your social media notifications is still one of the best productivity hacks of all time.",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "tanaypratap",
        userId: 8,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                username: "parthgabani",
                text: "Focus mode🙌🏻",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
        ],
    },
    {
        _id: uuid(),
        content: "You'll never be 100% prepared for that interview.",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "akshaysaini",
        userId: 9,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                username: "parthgabani",
                text: "Yes",
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
                createdAt: formatDate(),
            },
        ],
    },
    {
        _id: uuid(),
        content: "The easiest part of building a product is writing code.",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "akshaysaini",
        userId: 9,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [],
    },
    {
        _id: uuid(),
        content:
            "good companies with bad interviewers often lose great people;",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "akshaysaini",
        userId: 9,
        createdAt: formatDate(),
        updatedAt: formatDate(),
        comments: [],
    },
];
