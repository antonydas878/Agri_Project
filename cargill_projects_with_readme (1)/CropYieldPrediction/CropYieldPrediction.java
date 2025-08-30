
package com.cargill.cropyield;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class CropYieldPrediction {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://127.0.0.1:5000/predict?rainfall=200&fertilizer=50&soil=2");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            System.out.println("Predicted Yield: " + response.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
