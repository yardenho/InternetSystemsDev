import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import postController from "../controllers/post";
import request from "../request";

export = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
    const getAllPosts = async () => {
        console.log("get all posts handler");
        const res = await postController.getAllPostsEvent();
        socket.emit("post:get_all", res);
    };

    const newGetAllPosts = async (body) => {
        console.log(
            "get all posts handler with socketId: %s",
            socket.data.user
        );
        try {
            const response = await postController.newGetAllPosts(
                new request(body, socket.data.user, null)
            );
            console.log("trying to send post:get_all.response");
            socket.emit("post:get_all.response", response);
        } catch (err) {
            socket.emit("post:get_all.response", { status: "fail" });
        }
    };

    const getPostById = (payload) => {
        socket.emit("echo:echo", payload);
    };

    const addNewPost = (payload) => {
        socket.emit("echo:echo", payload);
    };

    console.log("register echo handlers");
    socket.on("post:get_all", newGetAllPosts);
    socket.on("post:get_by_id", getPostById);
    socket.on("post:add_new", addNewPost);
};
