package com.anth0o0ny.data;

import com.anth0o0ny.computation.Approximation;
import java.util.Arrays;

public class PointsModel {

    private double[] x;
    private double[] y;

    public PointsModel() {
    }

    public PointsModel(double[] x, double[] y) {
        this.x = x;
        this.y = y;
    }

    public double[] getX() {
        return x;
    }

    public void setX(double[] x) {
        this.x = x;
    }

    public double[] getY() {
        return y;
    }

    public void setY(double[] y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Points{" +
                "x=" + Arrays.toString(x) +
                ", y=" + Arrays.toString(y) +
                '}';
    }
}
