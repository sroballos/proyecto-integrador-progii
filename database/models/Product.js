module.exports = function(sequelize, dataTypes){
    let alias = "Product"

    let cols = {
        user_id:{
            type: dataTypes.INTEGER
        },
        id:{
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        title:{
            type: dataTypes.STRING(100)
        },
        artist:{
            type: dataTypes.STRING(100)
        },
        release_date:{
            type: dataTypes.DATE
        },
        image:{
            type: dataTypes.STRING(100)
        },
        description:{
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
        tablename: "products",
        timestamps: true,
        underscored: false
    }

    Product.associate =function(models){
    Product.hasMany(models.Comment, {
        as: "products",
        foreignKey:"id_products"
    })
    };   
    let Product = sequelize.define(alias, cols, config)
    return Product
}