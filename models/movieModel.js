const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    TMDBid: {
      type: String,
    },
    original_language: {
      type: String,
    },
    imdbId: {
      type: String,
    },

    imdb_rating: {
      type: String,
      default: 0,
    },

    original_country: {
      type: Array,
    },

    img: {
      type: String,
      required: true,
    },

    imgSmall: {
      type: String,
      required: true,
    },

    trailer: {
      type: Object,
    },

    year: {
      type: Number,
      required: true,
    },

    limitAge: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    allGenres: [{ type: mongoose.Types.ObjectId, ref: "Genre" }],

    listId: { type: mongoose.Types.ObjectId, ref: "List" },

    checked: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    actorsBelongTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actors" }],
    directorsBelongTo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Directors" },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
