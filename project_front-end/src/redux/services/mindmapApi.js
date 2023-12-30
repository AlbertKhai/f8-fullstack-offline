import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mindmapApi = createApi({
  reducerPath: 'mindmapApi',
  refetchOnReconnect: true,
  tagTypes: ['Mindmap'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_API_MINDMAP }),
  endpoints: (builder) => ({
    getMindmap: builder.query({
      query: (subUser) => `/mindmap/${subUser}`,
      providesTags: (result) => {
        // Kiểm tra xem result có phải là mảng hay không
        if (Array.isArray(result)) {
          return [...result.map(({ id }) => ({ type: 'Mindmap', id })), { type: 'Mindmap', id: 'LIST' }]
        }
        // Nếu không phải, trả về một mảng rỗng hoặc một mảng chứa giá trị mặc định
        return [{ type: 'Mindmap', id: 'LIST' }]
      },
      transformResponse: (response) => response.listMindmap
    }),
    postMindmap: builder.mutation({
      query(data) {
        const { subUser, body } = data
        return {
          url: `mindmap/${subUser}`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Mindmap', id },
        { type: 'Mindmap', id: 'LIST' }
      ]
    }),
    updateMindmap: builder.mutation({
      query(data) {
        const { subUser, body } = data
        return {
          url: `mindmap/${subUser}`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Mindmap', id },
        { type: 'Mindmap', id: 'LIST' }
      ]
    }),
    addUser: builder.mutation({
      query(body) {
        return {
          url: `mindmap`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Mindmap', id: 'LIST' }]
    })
  })
})
