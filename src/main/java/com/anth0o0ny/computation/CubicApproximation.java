package com.anth0o0ny.computation;

import com.anth0o0ny.data.PointsModel;

import java.util.Arrays;
import java.util.stream.IntStream;

public class CubicApproximation extends Approximation {

    public CubicApproximation(PointsModel points) {
        super(points);
    }
    final int N = x.length;

    @Override
    public void computeCoefficients() {

        double[][] am = new double[4][4];
        double[] bm = new double[4];

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                am[i][j] = sxn(i + j);
            }
        }

        bm[0] = sy();
        bm[1] = sxy();
        bm[2] = sxxy();
        bm[3] = sxxxy();

        Gauss elimination = new Gauss(am, bm);

        double[] coefs = elimination.solve();

        a = coefs[3];
        b = coefs[2];
        c = coefs[1];
        d = coefs[0];

    }

    private double sxxy() {
        return IntStream.range(0, x.length)
                .mapToDouble(i -> x[i] * x[i] * y[i])
                .sum();
    }

    private double sxxxy() {
        return IntStream.range(0, x.length)
                .mapToDouble(i -> x[i] * x[i] * x[i] * y[i])
                .sum();
    }

    private double sxn(int power) {
        return Arrays.stream(x)
                .map(x -> Math.pow(x, power))
                .sum();
    }

    @Override
    protected void computeA() {
        return;
    }

    @Override
    protected void computeB() {
        return;
    }

    @Override
    public void computePhy() {
        for (int i = 0; i < N; i++) {
            phy[i] = a * x[i] * x[i] * x[i] + b * x[i] * x[i] + c * x[i] + d;
        }
    }

    @Override
    public String toString() {
        return "CubicApproximation";
    }
}
