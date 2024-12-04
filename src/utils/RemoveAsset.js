export const removeReapetedAsset = (data) => {
    const lastItems = {};

    const uniqueData = data.filter((obj) => {
      lastItems[obj.asset_id] = obj;
      return true;
    });

    const lastRemovedItems = Object.values(lastItems);
    return lastRemovedItems;
  };