import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const baseUrl = "http://localhost:8000/api";
//const baseUrl = "http://localhost:8000/api";
 //const baseUrl =
//import.meta.env.VITE_BACKEND_URL + "/api" || "http://localhost:8000/api";
// query.ts
  const baseUrl = import.meta.env.VITE_BACKEND_URL 
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : "http://localhost:8000/api";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl,  prepareHeaders: async (headers) => {
   const clerk = window.Clerk;
   if (clerk){
      const token = await clerk.session.getToken();
     // console.log(token);
    
    if(token){
      headers.set("Authorization", `Bearer ${(token)}`)
    }
  }
  
   return headers;
 } }),

  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({id, groupBy, limit}) => {
        const params = new URLSearchParams();
        if (groupBy) params.append('groupBy', groupBy);
        if (limit) params.append('limit', limit.toString());
        const queryString = params.toString();
        return `/energy-generation-records/solar-unit/${id}${queryString ? `?${queryString}` : ''}`;
      },
    }),

    getSolarUnitforUser: build.query({
      query: () => `/solar-units/me`,
    }),
    getSolarUnits: build.query({
      query: () => `/solar-units`,
    }),
    getSolarUnitById: build.query({
      query: (id) => `/solar-units/${id}`,
    }),
    createSolarUnit: build.mutation({
      query: (data) => ({
        url: `/solar-units`,
        method: "POST",
        body: data,
      }),
    }),
    editSolarUnit: build.mutation({
      query: ({id, data}) => ({
        url: `/solar-units/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: build.query({
      query: () => `/users`,
    }),
    getCapacityFactorBySolarUnit: build.query({
      query: ({id, days}) => {
        const params = new URLSearchParams();
        if (days) params.append('days', days.toString());
        const queryString = params.toString();
        return `/energy-generation-records/solar-unit/${id}/capacity-factor${queryString ? `?${queryString}` : ''}`;
      },
    }),
    getAnomaliesForUser: build.query({
      query: ({type, severity, resolved}) => {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (severity) params.append('severity', severity);
        if (resolved !== undefined) params.append('resolved', resolved.toString());
        const queryString = params.toString();
        return `/anomalies/me${queryString ? `?${queryString}` : ''}`;
      },
    }),
    getAnomalyStatistics: build.query({
      query: ({resolved}) => {
        const params = new URLSearchParams();
        if (resolved !== undefined) params.append('resolved', resolved.toString());
        const queryString = params.toString();
        return `/anomalies/me/statistics${queryString ? `?${queryString}` : ''}`;
      },
    }),
    // Admin: get all anomalies across system (requires admin role)
    getAllAnomalies: build.query({
      query: ({ type, severity, resolved, solarUnitId } = {}) => {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (severity) params.append("severity", severity);
        if (resolved !== undefined) params.append("resolved", resolved.toString());
        if (solarUnitId) params.append("solarUnitId", solarUnitId);
        const queryString = params.toString();
        return `/anomalies${queryString ? `?${queryString}` : ""}`;
      },
    }),
    resolveAnomaly: build.mutation({
      query: (id) => ({
        url: `/anomalies/${id}/resolve`,
        method: "PATCH",
      }),
    }),
    runAnomalyDetection: build.mutation({
      query: () => ({
        url: "/anomalies/me/run-detection",
        method: "POST",
      }),
    }),
    // Invoice endpoints
    getInvoices: build.query({
      query: ({ status } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        const queryString = params.toString();
        return `/invoices${queryString ? `?${queryString}` : ''}`;
      },
    }),
    getInvoiceById: build.query({
      query: (id) => `/invoices/${id}`,
    }),
    getAllInvoices: build.query({
      query: ({ status, userId, solarUnitId } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (userId) params.append('userId', userId);
        if (solarUnitId) params.append('solarUnitId', solarUnitId);
        const queryString = params.toString();
        return `/invoices/admin/all${queryString ? `?${queryString}` : ''}`;
      },
    }),
    // Payment endpoints
    createPaymentSession: build.mutation({
      query: (data) => ({
        url: `/payments/create-checkout-session`,
        method: "POST",
        body: data,
      }),
    }),
    getSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
    
  }),
});

export const {
  useGetAllUsersQuery,
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetSolarUnitforUserQuery,
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useGetCapacityFactorBySolarUnitQuery,
  useGetAnomaliesForUserQuery,
  useGetAnomalyStatisticsQuery,
  useResolveAnomalyMutation,
  useRunAnomalyDetectionMutation,
  useGetAllAnomaliesQuery,
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetAllInvoicesQuery,
  useCreatePaymentSessionMutation,
  useGetSessionStatusQuery,
} = api;