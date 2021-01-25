
console.log({NODENV: process.env.NODE_ENV})
module.exports = {
  url: process.env.NODE_ENV == 'development' ? `mongodb+srv://root:toor@cluster0-4vfsv.gcp.mongodb.net/primary?retryWrites=true&w=majority` 
                                :  "mongodb://localhost:27017/hops",
                                
};
