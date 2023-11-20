import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'googleListId',
      title: 'googleListId',
      type: 'string',
    }),
    // defineField({
    //   name: 'hashedPassword',
    //   title: 'HashPassword',
    //   type: 'string',
    // }),
    defineField({
      name: 'imglink',
      title: 'ImgLink',
      type: 'url',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    // defineField({
    //   name: 'mainTasks',
    //   title: 'mainTasks',
    //   type: 'array',
    //   of: [
    //     {
    //       name: 'task',
    //       title: 'task',
    //       type: 'object',
    //       fields: [
    //         {name: 'date', type: 'string', title: 'date'},
    //         {name: 'title', type: 'string', title: 'title'},
    //       ],
    //     },
    //   ],
    // }),
    // defineField({
    //   name: 'image',
    //   title: 'Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // }),
  ],
  preview: {
    select: {
      title: 'email',
      media: 'image',
    },
  },
})
