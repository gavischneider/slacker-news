import React from "react";
import BlueButton from "../Components/Layout/BlueButton";
import { Component } from "react";
import fire from "../config/Fire";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.state = {
      owner: "",
      title: "",
      url: "",
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSumbit(e) {
    console.log("-------Owner------");
    console.log(fire.auth().currentUser.uid);
    if (fire.auth().currentUser)
      this.setState({ owner: fire.auth().currentUser.uid });

    // Extract items from state to create new post to save in db
    const newPost = {
      owner: fire.auth().currentUser.uid,
      title: this.state.title,
      url: this.state.url,
    };

    var db = fire.firestore();

    db.collection("posts")
      .add(newPost)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    //let postsRef = fire.database().ref("posts").orderByKey();
    //fire.database().ref("posts").push({
    //owner: fire.auth().currentUser.uid,
    //title: this.state.title,
    //url: this.state.url,
    //});
    this.setState({
      owner: "",
      title: "",
      url: "",
    });
    window.location.href = "/";
  }

  render() {
    return (
      <div className="m-auto w-1/3 flex flex-col p-6 bg-white mt-10 rounded-lg shadow-xl border-2 border-solid border-gray-200">
        <form className="w-full flex flex-col mx-auto py-8 px-6">
          <h4 className="font-bold uppercase text-blue-600">
            Create a new post
          </h4>
          <div className="flex flex-col mt-4">
            <label name="username" className="uppercase text-sm mb-2 font-bold">
              Post Title
            </label>
            <input
              onChange={this.handleChange}
              className="border-2 border-solid border-gray-400 px-4 py-2 rounded-lg"
              type="text"
              placeholder="Meep."
              name="title"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label name="url" className="uppercase text-sm mb-2 font-bold">
              URL
            </label>
            <input
              onChange={this.handleChange}
              className="border-2 border-solid border-gray-400 px-4 py-2 rounded-lg"
              type="text"
              placeholder="https://site.com"
              name="url"
            />
          </div>
          <div className="mt-8">
            <div
              onClick={this.handleSumbit}
              className="uppercase w-24 font-bold"
            >
              <BlueButton text="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default NewPost;
