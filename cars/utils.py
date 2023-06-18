import re
import pandas as pd

from sklearn.calibration import LabelEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler


def read_dataset(path):
    df = pd.read_csv(path)

    return df


def clean_dataset(df):

    df.drop('torque', axis=1, inplace=True)
    # fill numeric data with median and categorical data with most frequent
    numeric_col=[col for col in df.select_dtypes(['int','float'])]
    category_col=[col for col in df.select_dtypes(exclude=['int','float'])]

    for col in numeric_col:
        df[col].fillna(df[col].median(),inplace=True)
        
    for col in category_col:
        df[col].fillna(df[col].value_counts().index[0],inplace=True)

    # remove duplicated data
    df.drop_duplicates(inplace=True)


    ###

    # Encode the 'name' column using label encoder
    encoder = LabelEncoder()
    df['name'] = encoder.fit_transform(df['name'])

    ###

    ###

    # Perform one-hot encoding on the 'fuel' column
    fuel_one_hot = pd.get_dummies(df['fuel'], prefix='fuel')

    # Perform one-hot encoding on the 'transmission' column
    transmission_one_hot = pd.get_dummies(df['transmission'], prefix='transmission')

    # Perform one-hot encoding on the 'seller_type' column
    seller_type_one_hot = pd.get_dummies(df['seller_type'], prefix='seller_type')

    # Perform one-hot encoding on the 'owner' column
    owner_one_hot = pd.get_dummies(df['owner'], prefix='owner')

    # Merge the one-hot encoded DataFrames with the original DataFrame
    df = pd.concat([df, fuel_one_hot, transmission_one_hot, seller_type_one_hot, owner_one_hot], axis=1)

    # Drop the original categorical columns
    df.drop(['fuel', 'transmission', 'seller_type', 'owner'], axis=1, inplace=True)

    ###

    ###

    # Normalize the 'year' column using MinMaxScaler
    mm_scaler = MinMaxScaler()
    df['year'] = mm_scaler.fit_transform(df[['year']])

    ###

    ###

    # Extract the numerical values from the 'engine', 'mileage', 'max_power' columns
    
    df['mileage'] = df['mileage'].apply(lambda x: float(re.findall(r'\d+\.\d+', str(x))[0]) if isinstance(x, str) else x)
    df['engine'] = df['engine'].apply(lambda x: int(re.findall(r'\d+', str(x))[0]) if isinstance(x, str) else x)
    df['max_power'] = df['max_power'].apply(lambda x: int(re.findall(r'\d+', str(x))[0]) if isinstance(x, str) and re.findall(r'\d+', str(x)) else None)

    ###

    df.dropna(inplace=True)

    return df


def gradient_boosting_regressor(df):
    X = df.drop('selling_price', axis=1)
    y = df['selling_price']

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    gb = GradientBoostingRegressor(n_estimators=100, learning_rate=0.8, random_state=42)
    gb.fit(X_train, y_train)
    
    row = df.tail(1)

    try:
        return gb.predict(row.drop('selling_price', axis=1))[0]
    except Exception as ex:
        print(ex)
        pass
