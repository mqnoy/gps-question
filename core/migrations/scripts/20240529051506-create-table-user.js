'use strict'

const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            user_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            login_token: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        })

        const user = await generateUser()
        await queryInterface.bulkInsert('users', [user])
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('users')
    },
}

const generateUser = async () => {
    const password = await bcrypt.hash('secret', 14)
    const user = {
        user_id: 1,
        name: 'example',
        email: 'example@example.com',
        password,
        login_token: randomString.generate(8),
    }

    return user
}
