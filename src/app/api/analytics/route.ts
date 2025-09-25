import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { json } from "stream/consumers";

const analytics = google.analyticsdata("v1beta");

export  async function GET(req : NextRequest, res :NextResponse ) {
    try {
        console.log('starts fetching buddy')

        const auth = new google.auth.GoogleAuth({
            keyFile: "D:/next-js/projects/restaurant/src/app/admin/service-account.json", // Replace with your service account key
            scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
        });

        const analyticsClient = await analytics.properties.runReport({
            property: "properties/479278566", // Replace with your GA property ID
            auth,
            requestBody: {
                dimensions: [{ name: "sessionDefaultChannelGrouping" }],
                metrics: [{ name: "sessions" },{name:'activeUsers'}],
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            },
        });
        console.log(JSON.stringify(analyticsClient.data))
        return new Response(JSON.stringify(analyticsClient.data))

    } catch (error) {
        console.log('error of fetching analytics shit',error)
        console.error(error);
        return new Response(JSON.stringify(error))
    }
}
