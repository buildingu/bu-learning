import { createContext, useState, useContext } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => {
    setIsSubscribed(true);
  };
  const resetSubscription = () => {
    setIsSubscribed(false);
  };

  /* Context Data Return */
  return (
    <SubscriptionContext.Provider 
      value={{ 
        isSubscribed, // bool, default not subscribed
        subscribe, // func: set subscribed to true
        resetSubscription // func: set subscribed to false
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
