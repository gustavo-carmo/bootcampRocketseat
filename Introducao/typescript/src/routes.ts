import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export default function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "gustavo@msn.com.br",
    password: "123456",
    techs: ["React", "ReactNative", { title: "NodeJs", experience: 8 }],
  });

  response.json({ message: "Hello World!", user });
}
