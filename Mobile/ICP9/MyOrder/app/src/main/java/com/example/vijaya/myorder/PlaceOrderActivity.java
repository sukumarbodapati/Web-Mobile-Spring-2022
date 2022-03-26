package com.example.vijaya.myorder;

        import android.content.ActivityNotFoundException;
        import android.content.Intent;
        import android.net.Uri;
        import android.support.v7.app.AppCompatActivity;
        import android.os.Bundle;
        import android.view.View;
        import android.widget.EditText;
        import android.widget.TextView;
        import android.widget.Toast;

public class PlaceOrderActivity extends AppCompatActivity {

    String summaryInfo = "";
    String customerName = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_order);

        TextView summaryText = findViewById(R.id.textSummary);
        summaryInfo = getIntent().getStringExtra("sumKey");
        summaryText.setText(summaryInfo);
        customerName = getIntent().getStringExtra("Customer");
    }

    public void email_order(View view){
        EditText emailBox = findViewById(R.id.emailID);
        Intent send_email = new Intent(Intent.ACTION_SENDTO);
        send_email.setType("message/rfc822");
        String emailMessage = "mailto:" + emailBox.getText().toString() +
                "?cc=" +
                "&subject=" + Uri.encode("Order Confirmation Do Not Reply") +
                "&body=" + Uri.encode("Dear " + customerName + ",\n\n" + summaryInfo);

        send_email.setData(Uri.parse(emailMessage));

        try {
//            startActivity(send_email);
            startActivity(Intent.createChooser(send_email, "Choose an email client"));

        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "Unable To Send Email", Toast.LENGTH_SHORT).show();
        }


    }

}