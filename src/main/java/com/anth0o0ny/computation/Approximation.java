package com.anth0o0ny.computation;

import com.anth0o0ny.data.PointsModel;

import java.util.Arrays;
import java.util.stream.IntStream;

public abstract class
Approximation {
    protected final double[] x;
    protected final double[] y;

    protected double a = 0;
    protected double b = 0;
    protected double c = 0;
    protected double d = 0;

    protected double standardDeviation; //  среднеквадратичное отклонение
    protected double[] epsilons; //  отклонения
    protected double[] phy; //  новые значения
    protected double deviationMeasure; //  мера отклонения S

    public Approximation(PointsModel points) {
        this.x = points.getX();
        this.y = points.getY();
        this.epsilons = new double[x.length];
        this.phy = new double[x.length];
    }

    public abstract void computeCoefficients();

    protected abstract void computeA();

    protected abstract void computeB();

    protected void computeC() {
        return;
    }

    public abstract void computePhy();

    public void computeEpsilons() {
        for (int i = 0; i < x.length; i++) {
            epsilons[i] = phy[i] - y[i];
        }
    }

    public void computeStandardDeviation() {
        double difPhyY = 0;

        for (int i = 0; i < x.length; i++) {
            difPhyY += Math.pow(phy[i] - y[i], 2);
        }
        standardDeviation = Math.sqrt(difPhyY / x.length);
    }

    public  void computeDeviationMeasure() {
        deviationMeasure = Arrays.stream(epsilons)
                .map(eps -> eps * eps)
                .sum();
    }

    protected double sx() {
        return Arrays.stream(x)
                .sum();
    }

    protected double sxx() {
        return Arrays.stream(x)
                .map(x -> x * x)
                .sum();
    }

    protected double sy() {
        return Arrays.stream(y)
                .sum();
    }

    protected double sxy() {
        return IntStream.range(0, x.length)
                .mapToDouble(i -> x[i] * y[i])
                .sum();
    }

    public double getA() {
        return a;
    }

    public double getB() {
        return b;
    }

    public double getC() {
        return c;
    }
    public double getD() {
        return d;
    }

    public double[] getX() {
        return x;
    }

    public double[] getY() {
        return y;
    }

    public double getStandardDeviation() {
        return standardDeviation;
    }

    public double[] getEpsilons() {
        return epsilons;
    }

    public double[] getPhy() {
        return phy;
    }

    public double getDeviationMeasure() {
        return deviationMeasure;
    }

    @Override
    public String toString() {
        return "FunctionalApproximation";
    }
}

