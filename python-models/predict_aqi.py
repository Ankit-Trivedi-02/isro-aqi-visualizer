import sys
import json
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime

# Function to predict AQI based on historical data
def predict_aqi(input_data):
    # Extract city data and parameters
    city = input_data['city']
    year = input_data['year']
    vehicle_shift = input_data['vehicle_shift'] / 100  # Convert percentage to decimal
    tree_planting = input_data['tree_planting'] / 100  # Convert percentage to decimal
    renewable_energy = input_data['renewable_energy'] / 100  # Convert percentage to decimal
    monthly_data = input_data['monthly_data']
    
    # Prepare the dataset for prediction
    months = [entry['month'] for entry in monthly_data]
    aqi_values = [entry['aqi'] for entry in monthly_data]
    
    # Map months to numerical values (1 for January, 2 for February, etc.)
    month_mapping = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5,
        'June': 6, 'July': 7, 'August': 8, 'September': 9, 'October': 10,
        'November': 11, 'December': 12
    }
    months_numeric = [month_mapping[month] for month in months]
    
    # Convert to numpy arrays for model fitting
    X = np.array(months_numeric).reshape(-1, 1)
    y = np.array(aqi_values)

    # Train the linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Predict AQI for the next year (12 months)
    future_months = np.array(range(1, 13)).reshape(-1, 1)
    predicted_aqi = model.predict(future_months)
    
    # Apply improvement factors (simplistic model)
    improved_aqi = predicted_aqi.copy()

    # Adjust the AQI based on improvement factors
    for i in range(len(predicted_aqi)):
        improved_aqi[i] -= vehicle_shift * predicted_aqi[i]  # Vehicle shift reduction
        improved_aqi[i] -= tree_planting * predicted_aqi[i]  # Tree planting reduction
        improved_aqi[i] -= renewable_energy * predicted_aqi[i]  # Renewable energy reduction
    
    # Build the response data
    predicted_data = []
    for i, month in enumerate(month_mapping.keys()):
        predicted_data.append({
            'month': month,
            'predicted_aqi': predicted_aqi[i].tolist(),
            'improved_aqi': improved_aqi[i].tolist()
        })

    # Prepare the result in the required format
    result = {
        'city': city,
        'year': year + 1,  # Predict for next year
        'predicted_monthly_data': predicted_data
    }

    return result

# Main execution block
if __name__ == "__main__":
    # Read input data from stdin
    input_data = json.loads(sys.stdin.read())

    # Get predicted AQI values and improvements
    prediction_result = predict_aqi(input_data)

    # Output the result back to Node.js
    sys.stdout.write(json.dumps(prediction_result))
