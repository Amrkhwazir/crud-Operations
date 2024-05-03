import Post from "../modules/Crud.js";


// create post

export const userPost = async (req, res) => {


    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        res.status(200).send(savePost);
    } catch (error) {

        res.status(500).send(error)
    }

};

// get all post
export const getPost = async (req, res) => {
    
  try {
    const getPost = await Post.find();
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
    try {
     
    console.log(req.body);
    const updatedpost = await Post.findByIdAndUpdate(req.params.id,  {
        $set: req.body,
      },
      { new: true });
      res.status(200).json(updatedpost);
  
    } catch (error) {
     res.status(500).json(error); 
    }
};

// delete post

export const deletePost = async (req, res) => {
    try {
     
    console.log("delete post data");
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){

        await post.deleteOne();
        res.status(200).json("the post has been deleted");
        
    }else{
        res.status(403).json("you can only delete your post");
    }   
    } catch (error) {
     res.status(500).json(error); 
    }
};
