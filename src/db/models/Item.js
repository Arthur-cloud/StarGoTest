const { Schema, model } = require('mongoose');

const ItemSchema = Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        name: {
            type: String,
            required:true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
	},
	{
		timestamps: true,
	},
);

module.exports = model('Item', ItemSchema);
