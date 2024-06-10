'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('gps', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            device_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            device_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            timestamp: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        })

        const gps = require('./gps_data.json')
        await queryInterface.bulkInsert('gps', gps)
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('gps')
    },
}
