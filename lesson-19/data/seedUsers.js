// seedUsers.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 */
const mongoose = require("mongoose"),
  User = require("../models/User");

  mongoose.connect(  
    "mongodb+srv://ut-node:cJVs2c1wdnhfupa8@ut-node.br8wxbu.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node",
  );
  
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("connected to DB!!!");
  });

/** 
 * name: {
        // name 속성에 이름(first)과 성(last) 추가
        first: {
          type: String,
          trim: true,
        },
        last: {
          type: String,
          trim: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      }, // 비밀번호 속성 추가
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // 사용자와 강좌를 연결 시켜주기 위한 강좌 속성 추가
      subscribedAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscriber", // subscribedAccount를 사용자와 구독자를 연결하기 위해 추가
      },
*/

var users = [
  {
    name: {
      first: "Jae-suk",
      last: "Yoo",
    },
    email: "yjs@running.com",
    username: "grasshopper",
    phoneNumber: "",
    password: "1234",
    courses: [],
    profileImg:
      "https://newsimg-hams.hankookilbo.com/2022/01/21/f96adb47-e8b1-43fe-aa16-f2043012cbec.jpg",
  },
  {
    name: {
      first: "Haha",
      last: "",
    },
    email: "hhh@running.com",
    username: "haroro",
    phoneNumber: "010-????-????",
    password: "1234",
    courses: [],
    profileImg:
      "https://image.ytn.co.kr/general/jpg/2020/0719/202007191609185642_t.jpg",
  },
  {
    name: {
      first: "Myeong-su",
      last: "Park",
    },
    email: "pms@challenge.com",
    username: "mspark",
    phoneNumber: "010-1234-5678",
    password: "1234",
    courses: [],
    profileImg: "",
  },
  {
    name: {
      first: "Jun-ha",
      last: "Jeong",
    },
    email: "jjh@challenge.com",
    username: "junha",
    phoneNumber: "010-7777-7777",
    password: "1234",
    courses: [],
    profileImg: "",
  },
  {
    name: {
      first: "Se-hyung",
      last: "Yang",
    },
    email: "ysh@challenge.com",
    username: "sehyung",
    phoneNumber: "",
    password: "1234",
    courses: [],
    profileImg: "",
  },
  {
    name: {
      first: "Se-ho",
      last: "Jang",
    },
    email: "jsh@challenge.com",
    username: "seho",
    phoneNumber: "010-8282-8282",
    password: "1234",
    courses: [],
    profileImg: "",
  },
];

var commands = [];

User.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} user records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  users.forEach((u) => {
    commands.push(
      User.create({
        name: {
          first: u.name.first,
          last: u.name.last,
        },
        email: u.email,
        username: u.username,
        phoneNumber: u.phoneNumber,
        password: u.password,
        courses: u.courses,
        profileImg: u.profileImg,
      }).then((user) => {
        console.log(`Created user: ${user.name}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 500);
