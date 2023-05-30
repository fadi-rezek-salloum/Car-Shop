import pandas as pd
import numpy as np

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

    # Validate types
    df['engine'] = df['engine'].str.extract('([^\s]+)').astype("float")
    df['mileage'] = df['mileage'].str.extract('([^\s]+)').astype("float")
    df["max_power"] = df["max_power"].str.extract('([^\s]+)')
    df["max_power"] = df["max_power"][~(df["max_power"] == "bhp")]
    df["max_power"] = df["max_power"].astype("float")

    return df


def train_data(df):
    print(df.head(5))