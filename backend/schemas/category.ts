import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    // defineField({
    //   name: 'habits',
    //   title: 'Habits',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'habit'}}],
    // }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
