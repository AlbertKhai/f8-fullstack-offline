import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mindmapShare = createApi({
  reducerPath: 'mindmapShare',
  refetchOnReconnect: true,
  tagTypes: ['Mindmap'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_API_MINDMAP }),
  endpoints: (builder) => ({
    getMindmapShare: builder.query({
      query: (idMindmap) => `/mindmap/${idMindmap}`,
      providesTags: (result) => {
        // Kiểm tra xem result có phải là mảng hay không
        if (Array.isArray(result)) {
          return [...result.map(({ id }) => ({ type: 'Mindmap', id })), { type: 'Mindmap', id: 'LIST' }]
        }
        // Nếu không phải, trả về một mảng rỗng hoặc một mảng chứa giá trị mặc định
        return [{ type: 'Mindmap', id: 'LIST' }]
      }
    }),
    postMindmapShare: builder.mutation({
      query(body) {
        return {
          url: `mindmap`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Mindmap', id: 'LIST' }]
    }),
    updateMindmapShare: builder.mutation({
      query(data) {
        const { idMindmap, body } = data
        return {
          url: `mindmap/${idMindmap}`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Mindmap', id },
        { type: 'Mindmap', id: 'LIST' }
      ]
    }),
    deleteMindmapShare: builder.mutation({
      query(idMindmap) {
        return {
          url: `mindmap/${idMindmap}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [{ type: 'Mindmap', id: 'LIST' }]
    })
  })
})
