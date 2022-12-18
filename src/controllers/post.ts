import Post from "../models/post_model";
import { Request, Response } from "express";

const getAllPostsEvent = async () => {
    console.log("");
    try {
        const posts = await Post.find();
        return { status: "OK", data: posts };
    } catch (err) {
        console.log("err");
        return { status: "FAIL", data: "" };
    }
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        let posts = {};
        if (req.query.sender == null) {
            posts = await Post.find();
        } else {
            posts = await Post.find({ sender: req.query.sender });
        }

        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({ error: "fail to get posts from db" });
    }
};

const addNewPost = async (req: Request, res: Response) => {
    console.log(req.body);

    //save in DB
    const post = new Post({
        message: req.body.message,
        sender: req.body.userId, //extract the user id from the auth ,
    });

    try {
        const newPost = await post.save();
        console.log("save post in db");
        res.status(200).send(newPost);
    } catch (err) {
        console.log("fail to save post in db");
        res.status(400).send({ error: "fail adding new post to db" });
    }
};

const getPostById = async (req: Request, res: Response) => {
    console.log(req.params.id);

    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({ error: "fail to get post from db" });
    }
};

const putPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log("save post in db");
        res.status(200).send(post);
    } catch (err) {
        console.log("fail to update post in db");
        res.status(400).send({ error: "fail adding new post to db" });
    }
};

export = {
    getAllPostsEvent,
    getAllPosts,
    addNewPost,
    getPostById,
    putPostById,
};
