import juli from "./images/avatars/image-juliusomo.webp";
import max from "./images/avatars/image-maxblagun.webp";
import amy from "./images/avatars/image-amyrobson.webp";
import rams from "./images/avatars/image-ramsesmiron.webp";
const data = {
  currentUser: {
    image: {
      png: juli,
      webp: juli,
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "5/6/2019",
      score: 12,
      user: {
        image: {
          png: "../public/images/avatars/image-amyrobson.png",
          webp: amy,
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "1/20/1999",
      score: 5,
      user: {
        image: {
          png: "../public/images/avatars/image-maxblagun.png",
          webp: max,
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1/20/1999",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "../public/images/avatars/image-ramsesmiron.png",
              webp: rams,
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "1/28/2011",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "../public/images/avatars/image-juliusomo.png",
              webp: juli,
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};
export default data;
