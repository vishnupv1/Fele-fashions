const dynamodb = require('../helpers/dynamoConnect')
const { v4: uuidv4 } = require('uuid');


const addItem = ((req, res) => {
    try {
        const { productName, categoryId, price, productImage, brand } = req.body
        const params = {
            TableName: 'products',
            Item: {
                productId: uuidv4(),
                productName: productName,
                categoryId: categoryId,
                price: parseInt(price),
                productImage: productImage,
                brand: brand
            }
        };
        dynamodb.db.put(params, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json('Error putting item:');
            } else {
                return res.status(200).json('added item')
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json('Error putting item:');
    }
})
const getHome = ((req, res) => {
    try {
        res.render('index')
    } catch {

    }
})
const getCategories = (async (req, res) => {
    const params = {
        TableName: 'categories',
    };

    try {
        const data = await dynamodb.db.scan(params).promise();
        const categorylist = data.Items
        const totalCategories = data.Count
        const sortedData = categorylist.sort((a, b) => {
            const idA = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);

            return idA - idB;
        });
        res.status(200).json({ 'items': sortedData, 'totalCategories': totalCategories });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})
const getProduct = async (req, res) => {
    try {
        const tableName = 'products';
        const sortKeyValue = req.query.categoryId;
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'categoryId = :category',
            ExpressionAttributeValues: {
                ':category': sortKeyValue,
            }
        };
        const catParams = {
            TableName: 'categories',
            KeyConditionExpression: 'id = :category',
            ExpressionAttributeValues: {
                ':category': sortKeyValue,
            }
        };
        let categoryData
        dynamodb.db.query(catParams, (err, data) => {
            if (err) {
                return res.status(500).json('error')
            } else {
                categoryData = data.Items
                return categoryData
            }
        });

        dynamodb.db.query(params, (err, data) => {
            if (err) {
                return res.status(500).json('error')
            } else {
                const items = data.Items;
                return res.status(200).json({ 'categoryID': categoryData[0].id, 'categoryName': categoryData[0].name, items })
            }
        });
    }
    catch (err) {
        console.log(err);

    }
}
const category = async (req, res) => {
    try {
        res.render('categories')
    } catch (err) {
        res.status(404).json('Not found')
    }
}
const products = async (req, res) => {
    try {
        const categoryId = req.query.categoryId
        res.render('products', { 'id': categoryId })
    } catch (err) {
        res.status(404).json('Not found')
    }
}

module.exports = {
    addItem,
    getHome,
    getProduct,
    getCategories,
    category,
    products

}