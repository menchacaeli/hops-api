
console.log({NODENV: process.env.NODE_ENV})
module.exports = {
  url: `mongodb+srv://root:toor@cluster0-4vfsv.gcp.mongodb.net/primary?retryWrites=true&w=majority`, 
  // url: "mongodb://localhost:27017/hops",    
  jwtSecret: process.env.JWT_SECRET || "Supercalifragilisticexpialidotious",

                                
};
