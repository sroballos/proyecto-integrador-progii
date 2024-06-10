module.exports = function(sequelize, dataTypes){
    let alias = "Comment"

    let cols = {
        id:{
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_user:{
            type: dataTypes.INTEGER
        },
        id_products:{
            type: dataTypes.INTEGER
        },
        coment:{
            type: dataTypes.STRING
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
        tablename: "comments",
        timestamps: true,
        underscored: false
    }

    Comment.associate = function(models){
        Comment.belongsTo(models.Product, {
            as: "comment",
            foreignKey: "id_products"
        }),
        Comment.belongsTo(models.User,{
            as: "commentUser",
            foreignKey:"id_user"
        })
    };
    let Comment = sequelize.define(alias, cols, config)
    return Comment
}