export const PostData=[
    {
        id:1,
        image:require("../assets/InnerOval.png"),
        name:"Alice",
        posts:[
            {
                type:"image",
                path:require("../assets/InnerOval.png")
            },
            {
                type:"image",
                path:require("../assets/friends.jpg")
            },
            {
                type:"video",
                path:require("../assets/video.mp4")
            }
        ],
        likes:50,
        comments:[
            {
                id:"8723678",
                name:"barbon",
                message:"Nice Pic"
            },
            {
                id:"9832378",
                name:"Cloie",
                message:"Wow"
            },
            {
                id:"983758979",
                name:"James",
                message:"Nice Place"
            }
        ],
        caption:"Amazing weekend",
        date: "August 10"
    },
    {
        id:2,
        image:require("../assets/InnerOval2.png"),
        name:"Barbon",
        posts:[
            {
                type:"image",
                path:require("../assets/game.jpg")
            },
            {
                type:"image",
                path:require("../assets/monuments.jpg")
            }
        ],
        likes:120,
        comments:[
            {
                id:"783647",
                name:"barbon",
                message:"Nice Pic"
            },
            {
                id:"98390783242378",
                name:"Cloie",
                message:"Wow"
            }
        ],
        caption:"Games and posts",
        date: "March 15"
    },
    {
        id:3,
        image:require("../assets/InnerOval4.png"),
        name:"Ben",
        posts:[
            {
                type:"image",
                path:require("../assets/game2.jpg")
            },
            {
                type:"image",
                path:require("../assets/car.jpg")
            },
            
        ],
        likes:20,
        comments:[
            {
                id:"8723678",
                name:"Ben",
                message:"Nice Pic"
            },
            {
                id:"9832378",
                name:"Cloie",
                message:"Wow"
            },
        ],
        caption:"Nice Places",
        date: "Feburary 10"
    },
    {
        id:4,
        image:require("../assets/InnerOval.png"),
        name:"Barbon",
        posts:[
            {
                type:"image",
                path:require("../assets/game.jpg")
            },
            {
                type:"image",
                path:require("../assets/monuments.jpg")
            }
        ],
        likes:120,
        comments:[
            {
                id:"783647",
                name:"barbon",
                message:"Nice Pic"
            },
            {
                id:"98390783242378",
                name:"Cloie",
                message:"Wow"
            }
        ],
        caption:"Games and posts",
        date: "March 15"
    },
    {
        id:5,
        image:require("../assets/InnerOval3.png"),
        name:"Bob",
        posts:[
            {
                type:"video",
                path:require("../assets/video.mp4")
            },
            {
                type:"video",
                path:require("../assets/video2.mp4")
            }
        ],
        likes:120,
        comments:[
            {
                id:"783647",
                name:"barbon",
                message:"Nice Pic"
            },
            {
                id:"98390783242378",
                name:"Cloie",
                message:"Wow"
            }
        ],
        caption:"Games and posts",
        date: "March 15"
    }
]