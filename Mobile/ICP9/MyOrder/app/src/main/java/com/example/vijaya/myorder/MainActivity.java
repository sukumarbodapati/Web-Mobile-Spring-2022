package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 5;
    final int PEPPERONI_PRICE = 1;
    final int MUSHROOMS_PRICE = 1;
    final int OLIVES_PRICE = 1;
    final int SAUSAGE_PRICE = 1;
    int quantity = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    /**
     * This method is called when the order button is clicked.
     */

    public String submitOrder() {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if pepperoni is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        // check if mushrooms is selected
        CheckBox mushrooms = (CheckBox) findViewById(R.id.mushrooms_checked);
        boolean hasMushrooms = mushrooms.isChecked();

        // check if olives is selected
        CheckBox olives = (CheckBox) findViewById(R.id.olives_checked);
        boolean hasOlives = olives.isChecked();

        // check if sausage is selected
        CheckBox sausage = (CheckBox) findViewById(R.id.sausage_checked);
        boolean hasSausage = sausage.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasPepperoni, hasMushrooms, hasOlives, hasSausage);

        // create and store the order summary
        return createOrderSummary(userInputName, hasPepperoni, hasMushrooms, hasOlives, hasSausage, totalPrice);

    }

    public void sendEmail(String name, String output) {
        // Write the relevant code for triggering email

        // Hint to accomplish the task

        /*Intent intent = new Intent(Intent.ACTION_VIEW);
        if (intent.resolveActivity(getPackageManager()) !=null){
            startActivity(intent);
        }*/
    }

    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userInputName, boolean hasPepperoni, boolean hasMushrooms, boolean hasOlives, boolean hasSausage, float price) {
        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" +
                getString(R.string.order_summary_pepperoni, boolToString(hasPepperoni)) + "\n" +
                getString(R.string.order_summary_mushrooms, boolToString(hasMushrooms)) + "\n" +
                getString(R.string.order_summary_olives, boolToString(hasOlives)) + "\n" +
                getString(R.string.order_summary_sausage, boolToString(hasSausage)) + "\n" +
                getString(R.string.order_summary_quantity, quantity) + "\n" +
                getString(R.string.order_summary_total_price, price) + "\n" +
                getString(R.string.thank_you);
        return orderSummaryMessage;
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasPepperoni, boolean hasMushrooms, boolean hasOlives, boolean hasSausage) {
        int basePrice = PIZZA_PRICE;
        if (hasPepperoni) {
            basePrice += PEPPERONI_PRICE;
        }
        if (hasMushrooms) {
            basePrice += MUSHROOMS_PRICE;
        }
        if (hasOlives) {
            basePrice += OLIVES_PRICE;
        }
        if (hasSausage) {
            basePrice += SAUSAGE_PRICE;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of pizzas by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred pizzas");
            Context context = getApplicationContext();
            String lowerLimitToast = getString(R.string.too_much_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of pizzas by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select at least one pizza");
            Context context = getApplicationContext();
            String upperLimitToast = getString(R.string.too_little_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }

    public void place_order(View view){
        Intent orderIntent = new Intent(this, PlaceOrderActivity.class);
        orderIntent.putExtra("sumKey", submitOrder());
        EditText customerName = findViewById(R.id.user_input);
        orderIntent.putExtra("Customer", customerName.getText());

        startActivity(orderIntent);
    }

    public void summarize_order(View view){
        // Write the relevant code for making the buttons work(i.e implement the implicit and explicit intents
        Intent SummaryIntent = new Intent(this, SummaryActivity.class);
        SummaryIntent.putExtra("sumKey", submitOrder());

        startActivity(SummaryIntent);
    }


}