
package com.cargill.blockchain;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

class Block {
    public String hash;
    public String previousHash;
    private String data;
    private long timeStamp;

    public Block(String data, String previousHash) {
        this.data = data;
        this.previousHash = previousHash;
        this.timeStamp = System.currentTimeMillis();
        this.hash = calculateHash();
    }

    public String calculateHash() {
        try {
            String input = previousHash + Long.toString(timeStamp) + data;
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String getData() {
        return this.data;
    }
}

public class FoodTraceabilityBlockchain {
    public static List<Block> blockchain = new ArrayList<>();

    public static void main(String[] args) {
        blockchain.add(new Block("Farm -> Storage", "0"));
        blockchain.add(new Block("Storage -> Transport", blockchain.get(blockchain.size()-1).hash));
        blockchain.add(new Block("Transport -> Retailer", blockchain.get(blockchain.size()-1).hash));

        for (Block block : blockchain) {
            System.out.println("Data: " + block.getData());
            System.out.println("Hash: " + block.hash);
            System.out.println("Prev: " + block.previousHash);
            System.out.println("---------------------------");
        }
    }
}
