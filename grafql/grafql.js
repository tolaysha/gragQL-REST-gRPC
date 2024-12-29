const resolvers= {
    Query: {
      users(root, args) {return users.filter(user=> user.id=== args.id)[0] },
      posts(root, args) {return posts.filter(post=> post.id=== args.id)[0] }
    },
  
    User: {
      posts: (user)=> {
  return posts.filter(post=> post.userId=== user.id)
      }
    },
  
    Post: {
      user: (post)=> {
  return users.filter(user=> user.id=== post.userId)[0]
      }
    },
    Mutation: {
      incrementLike(parent, args) {
        users.map((user)=> {
  if(user.fname=== args.fname) {user.likes++; return user}
        })
        pubsub.publish('LIKES', {listenLikes: users});
  return users
      }
    },
    Subscription: {
      listenLikes: {
        subscribe: ()=> pubsub.asyncIterator(['LIKES'])
      }
    }
  };