export const FormatDate = (fechaString:string) => {
    const fecha = new Date(fechaString);
    

      const timeFormat: Intl.DateTimeFormatOptions = { month: 'numeric', year: 'numeric',day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, }

    return fecha.toLocaleDateString(undefined, timeFormat);
}
