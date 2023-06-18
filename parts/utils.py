import pandas as pd
import numpy as np

from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

def read_dataset(path):

    df = pd.read_csv(path)

    df.drop(columns=['Date','ID','Customer Name'], inplace=True)

    df.drop(0, inplace=True)

    return df

def transaction_rule(store_data, items):
    transactions = []
    for i in range(0, store_data.shape[0]):
        temp = []
        for j in range(0, store_data.shape[1]):
            if not store_data.iloc[i,j] is np.nan:
                temp.append(store_data.iloc[i,j])
        transactions.append(temp)

    te = TransactionEncoder()
    te_ary = te.fit_transform(transactions)
    df = pd.DataFrame(te_ary, columns=te.columns_)

    # Generate frequent itemsets
    f_items = apriori(df, min_support=0.0045, use_colnames=True)

    # Generate association rules
    rules = association_rules(f_items, metric='confidence', min_threshold=0.01)

    # Filter rules by antecedent
    filtered_rules = rules[rules['antecedents'].apply(lambda x: x == frozenset(items))]

    # Extract consequents
    consequents = filtered_rules['consequents'].apply(lambda x: list(x)[0]).values.tolist()

    return consequents