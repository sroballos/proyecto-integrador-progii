module.exports = function(sequelize, dataTypes){
    let alias = "User"

    let cols = {
        id:{
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email:{
            type: dataTypes.STRING(100)
        },
        passw:{
            type: dataTypes.STRING(100)
        },
        dateborn:{
            type: dataTypes.DATE
        },
        dni:{
            type: dataTypes.INTEGER
        },
        profilepic:{
            type: dataTypes.STRING(100)
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        },
        deletedAt:{
            type: dataTypes.DATE
        }
    }

    let config = {
        tablename: "users",
        timestamps: true,
        underscored: false
    }


    let User = sequelize.define(alias, cols, config)
    return User
}